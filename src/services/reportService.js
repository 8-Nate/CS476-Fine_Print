import { supabase } from '../config/supabase.js';

export async function createComplianceReport({ company, rule, reportingYear, answers }) {
  const generatedPayload = {
    report_title: rule.questionnaire_schema.title,
    legal_name: company.legal_name,
    entity_number: company.entity_number,
    statute_citation: rule.statute_citation,
    filing_authority: rule.filing_authority,
    deadline_rule: rule.deadline_rule,
    sections: rule.questionnaire_schema.questions.map((q) => ({
      key: q.key,
      statute_ref: q.statute_ref,
      label: q.label,
      answer: q.type === 'boolean' ? Boolean(answers[q.key]) : answers[q.key] || '',
      public_redacted: Boolean(q.public_redacted),
    })),
  };

  const { data, error } = await supabase
    .from('compliance_reports')
    .insert({
      company_id: company.id,
      benefit_subtype: company.benefit_subtype,
      reporting_year: reportingYear || 2026,
      questionnaire_responses: answers,
      generated_report_payload: generatedPayload,
      status: 'completed',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
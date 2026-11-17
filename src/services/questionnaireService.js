import { supabase } from '../config/supabase.js';

export async function getAllCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('id, legal_name, state_code, benefit_subtype, entity_number, fiscal_year_end')
    .order('id');

  if (error) throw error;
  return data;
}

export async function getQuestionnaireBySubtype(benefitSubtype) {
  const { data, error } = await supabase
    .from('state_compliance_rules')
    .select('state_code, benefit_subtype, statute_citation, filing_authority, deadline_rule, questionnaire_schema')
    .eq('benefit_subtype', benefitSubtype)
    .single();

  if (error) throw error;
  return data;
}
import { fetchAssessmentsByOrganizationId } from '@/root/src/data/queries/assessment'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const organizationId = searchParams.get('organizationId')
  if (!organizationId) return
  const { data: assessments } = await fetchAssessmentsByOrganizationId({ organizationId })
  return Response.json(assessments)
}

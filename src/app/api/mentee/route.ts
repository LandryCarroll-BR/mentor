import { fetchMenteesByOrganization } from '@/data/queries/mentee'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const organizationId = searchParams.get('organizationId')
  if (!organizationId) return
  const { data: mentees } = await fetchMenteesByOrganization({ organizationId })
  return Response.json(mentees)
}

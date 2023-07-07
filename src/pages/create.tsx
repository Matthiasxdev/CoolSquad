import ListForm from "@/components/forms/UploadForm"
import type { GetServerSidePropsContext } from "next"
import { Session, getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]";
// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session || session.user?.role === "user"){
    return {
      redirect: {
        permanent: false,
        destination: "/403"
      }
    }
  }

  return {
    props: {
      session: session,
    },
  }
}


export default function CreatePage ({ session }: { session: Session }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.

  

  return (        
      <>
        <ListForm />
      </>
  )
}

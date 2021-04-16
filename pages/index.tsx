// utils
import withAuth from '@/utils/withAuth'

function Home() {
  return (
    <>
      Not signed in <br />
    </>
  )
}

export default withAuth(Home)

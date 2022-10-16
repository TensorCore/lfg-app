import { Auth } from '@supabase/ui'
import { useUser } from '@supabase/auth-helpers-react'
import { supabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import type {NextPage} from 'next'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { user, error } = useUser()
  if (user?.aud === 'authenticated') {
    router.push('/')
  }
  if(!user) {
    return(
      <div className='grid h-screen place-items-center'>
        <div className='w-2/4'>
          {error && <p>{error.message}</p>}
          <Auth
            supabaseClient={supabaseClient}
            providers={['google', 'github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      </div>
    )
  }

  return(
    <div className='grid h-screen place-items-center'>
      <Link href='/auth'><button className='text-blue-400 hover:underline'>Click here to redirect back to home page</button></Link>
    </div>
  )
}
export default LoginPage
export default function Forbidden() {
  return (
    <main className='min-h-screen bg-background text-foreground flex items-center justify-center px-4'>
      <div className='flex flex-col items-center justify-center text-center max-w-md'>
        <div className='mb-2'>
          <svg className='w-16 h-16 mx-auto text-accent mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm6-10V7a3 3 0 00-6 0v4h6z' />
          </svg>
        </div>
        <div className='mb-8'>
          <h2 className='text-3xl font-semibold mb-3'>Forbidden Access</h2>
          <p className='font-geist-mono text-muted-foreground tracking-tighter'>You don't have permission to access this resource. Your credentials don't match the required access level.</p>
        </div>
      </div>
    </main>
  )
}

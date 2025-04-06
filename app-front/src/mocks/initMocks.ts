export async function initMocks() {
    if (typeof window === 'undefined') {
        console.log('❌ Not running in browser - skipping MSW')
        return
    }

    if (process.env.NEXT_PUBLIC_API_MOCKING !== 'enabled') {
        console.log('❌ MSW disabled - check NEXT_PUBLIC_API_MOCKING')
        return
    }

    console.log('✅ Starting MSW...')
    const { worker } = await import('./browser')
    await worker.start({
        onUnhandledRequest: 'bypass',
    })
    console.log('🧪 MSW started')
}

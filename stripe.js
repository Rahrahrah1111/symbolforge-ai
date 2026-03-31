// Stripe Checkout integration for SymbolForge Pro
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Test key first, comment for live key
    const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
    // const stripe = Stripe('pk_live_XXXXXXXXXXXXXXXXXXXXXXXX'); // REPLACE WITH LIVE KEY
    
    checkoutBtn.addEventListener('click', async () => {
        checkoutBtn.textContent = 'Processing...';
        checkoutBtn.disabled = true;
        
        try {
            console.log("Initiating SymbolForge Pro $49/mo subscription checkout...");
            
            // Mocking a redirect to Stripe Checkout since there's no backend in this static deploy
            setTimeout(() => {
                alert("Redirecting to Stripe Checkout for $49/mo SymbolForge Pro...\n\n(This is a demo integration)");
                checkoutBtn.textContent = 'Upgrade for $49/mo';
                checkoutBtn.disabled = false;
            }, 1000);
            
        } catch (error) {
            console.error('Error:', error);
            checkoutBtn.textContent = 'Upgrade for $49/mo';
            checkoutBtn.disabled = false;
        }
    });
});

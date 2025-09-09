import SubscriptionPlans from "../components/Payments/SubscriptionPlans";
import StripeCheckout from "../components/Payments/StripeCheckout";

export default function PricingPage() {
  const handleSelectPlan = (plan) => {
    console.log("Selected plan:", plan);
    // trigger StripeCheckout here
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Choose a Plan</h1>
      <SubscriptionPlans onSelectPlan={handleSelectPlan} />
      {/* Later: show StripeCheckout after selecting plan */}
    </div>
  );
}

import Pricing from "../components/Pricing/Pricing";

const Pricings = () => {
  return (
    <div>
      <div className="font-[sans-serif] bg-white  py-6">
        <div className="max-w-7xl max-lg:max-w-2xl mx-auto px-3">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">
              Choose a Subscription
            </h2>
            <p className="text-sm text-gray-500">
              choose a plan tailored to your needs
            </p>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6 max-sm:max-w-sm max-sm:mx-auto mt-12">
            <Pricing />
            <Pricing />
            <Pricing />
            <Pricing />
            <Pricing />
            <Pricing />
            <Pricing />
            <Pricing />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricings;

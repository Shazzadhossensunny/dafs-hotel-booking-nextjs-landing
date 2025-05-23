import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const PoliciesSection = () => {
  const policies = [
    {
      title: "Check-in",
      content: (
        <div>
          <p className="font-medium text-sm mb-2">Available 24 hours</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Guests are required to show a photo identification and credit card
            upon check-in. You'll need to let the property know in advance what
            time you'll arrive.
          </p>
        </div>
      ),
    },
    {
      title: "Check-out",
      content: (
        <div>
          <p className="font-medium text-sm">Available 24 hours</p>
        </div>
      ),
    },
    {
      title: "Cancellation/ prepayment",
      content: (
        <div>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            Cancellation and prepayment policies vary according to accommodation
            type. Please check what{" "}
            <span className="text-blue-600 underline cursor-pointer">
              conditions
            </span>{" "}
            may apply to each option when making your selection.
          </p>
        </div>
      ),
    },
    {
      title: "Children and beds",
      content: (
        <div className="space-y-3">
          <div>
            <p className="font-medium text-sm mb-1">Child policies</p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Children of any age are welcome.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Children 12 years and above will be charged as adults at this
              property.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              To see correct prices and occupancy information, please add the
              number of children in your group and their ages to your search.
            </p>
          </div>
          <div>
            <p className="font-medium text-sm mb-1">
              Cot and extra bed policies
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The number of extra beds allowed is dependent on the option you
              choose. Please check your selected option for more information.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              There are no cots available at this property.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              All extra beds are subject to availability.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "No age restriction",
      content: (
        <div>
          <p className="text-gray-600 text-sm">
            There is no age requirement for check-in
          </p>
        </div>
      ),
    },
    {
      title: "Pets",
      content: (
        <div>
          <p className="text-gray-600 text-sm">Pets are not allowed.</p>
        </div>
      ),
    },
    {
      title: "Cash only",
      content: (
        <div>
          <p className="text-gray-600 text-sm">
            This property only accepts cash payments.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full container mx-auto p-4 sm:p-6">
      <Card className="border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Policies</h2>
          </div>

          {/* Policies List */}
          <div className="divide-y divide-gray-200">
            {policies.map((policy, index) => (
              <div key={index} className="px-4 sm:px-6 py-4 sm:py-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Policy Title */}
                  <div className="lg:col-span-1">
                    <h3 className="text-sm font-medium text-gray-900 leading-relaxed">
                      {policy.title}
                    </h3>
                  </div>

                  {/* Policy Content */}
                  <div className="lg:col-span-2">{policy.content}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoliciesSection;

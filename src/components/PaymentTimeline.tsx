
type Step = 1 | 2 | 3;

export function PaymentTimeline({ currentStep }: { currentStep: Step }) {
    const steps = [
        { id: 1, label: "Shopping Cart" },
        { id: 2, label: "Shipping Address" },
        { id: 3, label: "Payment Method" }
    ];

    return (
        <div className="mb-6">
            <div className="flex items-center justify-center">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;

                    return (
                        <div key={step.id} className="flex items-center">
                            <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold 
                                    ${isActive? "bg-yellow-400 text-white"
                                        : isCompleted? "bg-green-600 text-white"
                                            : "bg-zinc-200 text-zinc-500"
                                    }`}>
                                {step.id}
                            </div>

                            <div
                                className={`ml-2 text-sm font-medium ${isActive? "text-yellow-500" : isCompleted? "text-green-600" : "text-zinc-400"}`}>
                                {step.label}
                            </div>

                            {index < steps.length - 1 && (
                                <div className={`flex w-4 h-[2px] mx-4 ${isCompleted? "bg-green-600" : "bg-zinc-200"}`}></div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
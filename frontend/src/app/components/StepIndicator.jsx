

export default function StepIndicator(props) {
    if (props.step === 1) {
        return (
            <div className="flex justify-center items-center space-x-4 mb-[5%]">
                {/* Dot 1 (active) */}
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                {/* Dot 2 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>

                {/* Dot 3 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
        );
    } else if (props.step === 2) {
        return (
            <div className="flex justify-center items-center space-x-4 mb-[10%]">
                {/* Dot 1 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>

                {/* Dot 2 (active) */}
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                {/* Dot 3 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            </div>
        );
    } else if (props.step === 3) {
        return (
            <div className="flex justify-center items-center space-x-4 mb-[10%]">
                {/* Dot 1 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>

                {/* Dot 2 */}
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>

                {/* Dot 3 (active) */}
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
        );
    }
    return (
        <div className="flex justify-center items-center space-x-4">
            {/* Dot 1 */}
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>

            {/* Dot 2 (active) */}
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>

            {/* Dot 3 */}
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        </div>
    );
}

'use client'
import { useState } from "react"
interface Props {
    fieldId: string,
    fieldName: string,
    choices: any[],
    defaultValue: string
}

const RadioSelector = ( { fieldId, fieldName, choices, defaultValue = ''}: Props) => {
    const [vinylCondition, setVinylCondition] = useState<string | null>(null)
    setVinylCondition

    return (
        <div>
            <legend className="mb-2 block text-sm font-medium">
            { fieldName }
            </legend>

            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                <div className="flex gap-4">
                    {choices.map((choice, index) => {
                        let defaultC: boolean = false
                        if (defaultValue == choice.slug) defaultC = true;

                        return <div key={index} className="flex item-center has-tooltip bg-slate-300 p-2 rounded-sm">
                                <input
                                    id={fieldId + '_' + choice.slug}
                                    name={fieldId}
                                    type="radio"
                                    defaultChecked={defaultC}
                                    value={choice.slug}
                                    className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2 align-middle"
                                    onChange={(e) => {
                                        const description = choices.find(c => c.slug === e.target.value).description
                                        setVinylCondition(description)
                                    }}
                                />
                                <label
                                    htmlFor={fieldId + '_' + choice.slug}
                                    className="ml-2 cursor-pointer px-3 text-xs font-medium text-gray-600 align-middle">
                                    <span className="tooltip rounded-sm shadow-lg p-1 -mt-16 bg-gray-800 text-white px-2 ">
                                        {choice.tooltip}
                                    </span>
                                    {choice.name}
                                </label>
                            </div>
                    })}
                </div>
                <div className="w-full text-gray-700 font-light">
                    {vinylCondition}
                </div>
            </div>
        </div>
    )
}

export default RadioSelector
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Filters({ filterValue }: { filterValue: string }) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const handleFilter = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('filter', term);
        } else {
            params.delete('filter');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <main className="grid w-full pt-4 place-items-center text-white">
            <div className="grid grid-cols-5 rounded-x p-2 space-x-3">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="1"
                        value="g"
                        className="peer hidden"
                        checked={filterValue === 'g'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="1"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        Grupos
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="2"
                        value="16"
                        className="peer hidden"
                        checked={filterValue === '16'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="2"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        16vos
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="3"
                        value="8"
                        className="peer hidden"
                        checked={filterValue === '8'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="2"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        8vos
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="4"
                        value="4"
                        className="peer hidden"
                        checked={filterValue === '4'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="3"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        4tos
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="5"
                        value="2"
                        className="peer hidden"
                        checked={filterValue === '2'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="4"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        Semis
                    </label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        id="6"
                        value="1"
                        className="peer hidden"
                        checked={filterValue === '1'}
                        onChange={(e) => {
                            handleFilter(e.target.value);
                        }}
                    />
                    <label
                        htmlFor="5"
                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600"
                    >
                        Final
                    </label>
                </div>
            </div>
        </main>
    );
}

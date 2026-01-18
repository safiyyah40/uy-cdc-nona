/**
 * Komponen Input Checkbox
 * Custom checkbox yang sudah ada styling default-nya (Indigo style).
 * Bisa nerima class tambahan lewat props tanpa numpuk class bawaannya.
 */
export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
                className
            }
        />
    );
}

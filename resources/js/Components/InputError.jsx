/**
 * Komponen Pesan Error Input
 * Muncul secara kondisional: kalau 'message' ada, render teks merah.
 * Kalau kosong, komponen ini tidak me-render apa pun (null).
 */
export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}

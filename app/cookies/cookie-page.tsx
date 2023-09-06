import { cookies } from "next/headers";

export default function Cookies() {
  const cookieStore = cookies();
  return (
    <div className='flex relative justify-start mx-auto w-full max-w-full overflow-x-auto bg-[var(--offsetcode)]'>
      <table className='w-full text-sm text-left'>
        <thead className='text-sm border-b border-[var(--primary)]'>
          <tr>
            <th scope='col' className='px-6 py-3 font-bold'>
              Name
            </th>
            <th scope='col' className='px-6 py-3 font-bold'>
              Value
            </th>
          </tr>
        </thead>
        {cookieStore.getAll().map((cookie) => (
          <tbody key={cookie.name}>
            <tr className=' border-b border-[var(--muted)]'>
              <td
                scope='row'
                className='px-6 py-4 font-medium whitespace-nowrap '
              >
                {cookie.name}
              </td>
              <td className='px-6 py-4'>{cookie.value}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

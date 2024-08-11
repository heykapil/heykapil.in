import { getUploadHistory } from 'app/db/queries';
export async function UploadHistory() {
  let entries = await getUploadHistory();

  if (entries.length === 0) {
    return null;
  } else {
    return (
      <>
        <h1 className="font-medium my-10 text-xl"># S3 Upload history</h1>
        <div className="border-separate overflow-clip rounded-sm border-y overflow-y-auto h-96">
          <div className="sticky top-0">
            <div className="flex flex-col w-full min-w-full">
              <table className="min-w-full text-left rtl:text-right">
                <thead className="flex min-w-full border-[#737373] border-b bg-zinc-50 dark:bg-zinc-900">
                  <tr className="flex flex-row w-full justify-between">
                    <th className="px-4 py-2 flex">Name (size)</th>
                    <th className="px-4 py-2 flex">Date</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
          <div className="flex flex-col w-full min-w-full">
            <table className="w-full min-w-full text-left rtl:text-right">
              <tbody className="flex flex-col min-w-full">
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className="flex flex-row w-full justify-between space-x-2"
                  >
                    <td className="px-4 py-2 flex text-right truncate line-wrap-1 break-all hover:truncate-none">
                      <a
                        href={entry.url}
                        target="_blank"
                        className="hover:underline hover:cursor-pointer hover:text-blue-500"
                      >
                        {entry.name}({Number(entry.size)} kb)
                      </a>
                    </td>
                    <td className="px-4 py-2 flex text-left">
                      {entry.uploaded_at}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

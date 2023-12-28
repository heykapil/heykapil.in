import { getUploadHistory } from "app/db/queries";
export async function UploadHistory() {
  let entries = await getUploadHistory();

  if (entries.length === 0) {
    return null;
  } else {
    return (
      <div className="flex flex-col">
        <h1 className="font-medium mt-10 text-2xl">History</h1>
        <table className="table-auto w-full border-separate [border-spacing:0.75rem]">
          <thead>
            <tr className="row">
              <th className="col">Date</th>
              <th className="col">Name (size)</th>
              <th className="col justify-start">URL</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="row">
                <td className="col">{entry.uploaded_at}</td>
                <td className="col">
                  <p>
                    {entry.name}
                    <span> ({Number(entry.size)} kb)</span>
                  </p>
                </td>
                <td className="col">
                  <a
                    href={entry.url}
                    target="_blank"
                    className="underline text-sm text-blue-600 dark:text-blue-300 word-wrap truncate"
                  >
                    {entry.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

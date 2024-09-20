import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Users() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: profiles, error } = await supabase.from("profiles").select("*");

  return (
    <div>
      user-account
      <table>
        <thead>
          <tr>
            <th>updated_at</th>
            <th>full_name</th>
            <th>username</th>
            <th>avatar_url</th>
            <th>website</th>
          </tr>
        </thead>
        <tbody>
          {profiles?.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.updated_at}</td>
              <td>{profile.full_name}</td>
              <td>{profile.username}</td>
              <td>{profile.avatar_url}</td>
              <td>{profile.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{JSON.stringify(profiles, null, 2)}</pre>
    </div>
  );
}
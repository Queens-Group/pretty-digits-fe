import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { doLogout } from "../actions"

 
export function SignOutBtn() {
  return <Button onClick={async () => await doLogout()}>Sign Out</Button>
}
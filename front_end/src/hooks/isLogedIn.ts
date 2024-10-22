import { useQuery } from "@tanstack/react-query";
import { fetchStatus } from "../clientApi";

function useIsLogedIn(): { isLoggedIn: boolean } {
  const { isError } = useQuery({queryKey : ["validationToken"] , queryFn : fetchStatus});
  console.log(isError);
  return { isLoggedIn: !isError };
}

export default useIsLogedIn;
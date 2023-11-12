import { useCookies } from "react-cookie"

function useJWT() {
  const [cookie, setCookie, removeCookie] = useCookies(["token"])

  const setToken = () => {
    setCookie("token", "b303d868-7264-11ee-b962-0242ac120002", {
      maxAge: 30 * 24 * 60 * 60,
    })
  }

  const removeToken = () => removeCookie("token")

  const isTokenValid = () => cookie.token !== undefined

  const getToken = () => cookie.token

  return {
    setToken,
    removeToken,
    isTokenValid,
    token: getToken(),
  }
}

export default useJWT

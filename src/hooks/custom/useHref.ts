function useGetHref(pathname: string) {
  if (pathname === '/') {
    return '/'
  }

  return pathname.split('/').filter((item) => item !== '' && item !== 'app')[0]
}

export default useGetHref
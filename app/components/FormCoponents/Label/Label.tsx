export const Label: React.FunctionComponent<{ children: any, htmlFor: string }> = ({ children, htmlFor }) => {
  return (
  <label htmlFor={htmlFor}>
    {children}
  </label>)
}

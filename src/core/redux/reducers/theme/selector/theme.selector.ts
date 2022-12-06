namespace ReduxThemeSelector {
   export function getTheme(state):string {
       return state["theme"]["state"]
   }
}

export default ReduxThemeSelector
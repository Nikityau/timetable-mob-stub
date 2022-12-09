import {IThemeState} from "../interface/theme.state";

namespace ReduxThemeSelector {
   export function getTheme(state):IThemeState {
       return state["theme"]["state"]
   }
}

export default ReduxThemeSelector
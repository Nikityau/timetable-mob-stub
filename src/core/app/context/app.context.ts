import ReduxApi from "../../redux/api/redux.api";

export const appContextApi = {
    reduxApi: {
        date: {
            action: {
                init: ReduxApi.DateApi.Action.init,
                setCurrentByNow: ReduxApi.DateApi.Action.dateCurrentByNow,
                setCurrent: ReduxApi.DateApi.Action.dateCurrent
            },
            selector: {
                getDateNow: ReduxApi.DateApi.Selector.getDateNow,
                getDateCurrent: ReduxApi.DateApi.Selector.getDateCurrent
            }
        },
        timetable: {
            action: {
                init: ReduxApi.TimetableApi.Action.init,
                setParsedTimetable: ReduxApi.TimetableApi.Action.setParsedTimetable
            },
            selector: {
                getGroupFullTitle: ReduxApi.TimetableApi.Selector.getGroupFullTitle
            }
        },
        theme: {
            action: {
                setDark: ReduxApi.ThemeApi.Action.setDark,
                setLight: ReduxApi.ThemeApi.Action.setLight,
                setDefault: ReduxApi.ThemeApi.Action.setDefault
            },
            selector: {
                getTheme: ReduxApi.ThemeApi.Selector.getTheme
            }
        }
    }
}
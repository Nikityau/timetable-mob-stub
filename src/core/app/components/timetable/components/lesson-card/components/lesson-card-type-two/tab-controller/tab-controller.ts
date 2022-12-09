import {domClass, TabType} from "../lesson-card-type-two";
import {TabActionType} from "../reducer/action/tab.action.type";

export class TabController {
    constructor(public state: any, private dispatch: any) {
        this.activeTabClass = this.activeTabClass.bind(this)
        this.contactTabClass = this.contactTabClass.bind(this)
        this.switchToTabClass = this.switchToTabClass.bind(this)
        this.closeTabClass = this.closeTabClass.bind(this)
        this.tabChange = this.tabChange.bind(this)
    }

    tabChange(tab: TabType) {
        return () => {
            if (this.state.activeTab == tab) return
            this.dispatch({
                type: TabActionType.SET_ACTIVE_CLOSE_CONTACT,
                payload: {
                    activeTab: tab,
                    isNoContact: true,
                    isCanClose: false
                }
            })

            setTimeout(() => {
                this.dispatch({type: TabActionType.SET_IS_CAN_CLOSE, payload: true})
            }, 300)

            setTimeout(() => {
                this.dispatch({type: TabActionType.SET_IS_NO_CONTACT, payload: false})
                if (tab == 'left') {
                    this.dispatch({type: TabActionType.SET_SWITCH_TO_TAB, payload: 'right'})
                } else {
                    this.dispatch({type: TabActionType.SET_SWITCH_TO_TAB, payload: 'left'})
                }

            }, 350)
        }
    }

    activeTabClass(tab: TabType): domClass {
        return this.state.activeTab == tab
            ? 'tabpen__tab_active tabpen__tab_animation_on'
            : 'tabpen__tab_inactive'
    }

    contactTabClass(): domClass {
        return this.state.isNoContact
            ? 'tabpen__tab_not_contact'
            : 'tabpen__tab_can_contact'
    }

    switchToTabClass(tab: TabType): domClass {
        return this.state.switchToTab == tab
            ? 'tabpen__tab_upper'
            : 'tabpen__tab_lower'
    }

    closeTabClass(tab: TabType): domClass {
        return this.state.activeTab != tab && this.state.isCanClose
            ? [
                'tabpen__tab_inactive_close',
                tab == 'left'
                    ? 'tabpen__tab_left_inactive'
                    : 'tabpen__tab_right_inactive',
                'tabpen__tab_animation_off'
            ].join(' ')
            : ''
    }
}
// Copyright (C) 2021  Shanhu Tech Inc.
//
// This program is free software: you can redistribute it and/or modify it
// under the terms of the GNU Affero General Public License as published by the
// Free Software Foundation, either version 3 of the License, or (at your
// option) any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License
// for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import * as appcore from '@shanhuio/misc/dist/appcore'
import * as reactutil from '@shanhuio/misc/dist/reactutil'
import * as timeutil from '@shanhuio/misc/dist/timeutil'

export class PageData {
    Path: string
    Now: timeutil.Timestamp
    NeedSudo: boolean

    Overview: any
    TwoFactorAuth: any
    SecurityLogs: any
    SSHKeys: any
}

export interface PageSetter {
    setData(d: PageData): void
}

export class Core {
    tab: string = ''
    app: appcore.Core

    constructor(app: appcore.Core) {
        this.app = app
    }

    redraw() { this.app.redraw() }

    goto(p: string) { this.app.gotoPath(p) }

    setTab(tab: string) {
        this.tab = tab
        this.redraw()
    }

    onClickGoto(p: string) {
        return (ev: React.MouseEvent) => {
            if (reactutil.isModifiedClick(ev)) return
            ev.preventDefault()
            this.goto(p)
        }
    }

    setData(page: PageSetter, data: any) {
        let d = data as PageData
        if (d.NeedSudo) {
            let redirect = '/confirm-password?redirect=' +
                encodeURIComponent('/' + d.Path)
            window.location.replace(redirect)
            return
        }
        page.setData(d)
        this.redraw()
    }

    fetch(page: PageSetter, path: string) {
        let req = { Path: path }
        this.app.call('/api/dashboard/data', req, {
            success: (d: any, status: string, xhr: JQueryXHR) => {
                this.setData(page, d)
            },
            error: (xhr: JQueryXHR, status: string, err: string) => {
                console.log(status + ' - ' + err)
            },
        })
    }

    fetchOrSet(page: PageSetter, path: string, data: any) {
        if (data) {
            this.setData(page, data)
        } else {
            this.fetch(page, path)
        }
    }
}

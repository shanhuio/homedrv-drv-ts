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

import * as React from 'react' // for tsx

import go from '@shanhuio/htmlgen/dist/go'

import * as common from './common'

export function make() {
    let p = common.makePage('inputtotp')
    p.body = <div>
        <div id="main"></div>
        <script>var pageData={go('.Data')};</script>
    </div>
    p.bodyClass = 'cover'

    p.scripts = [
        '/jslib/jquery.js',
        '/jslib/react.js',
        '/jslib/react-dom.js',
        '/js/inputtotp.js',
    ]
    return p
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import React, { useContext, useState } from 'react';
import { PullRequest } from '../../src/github/views';

import PullRequestContext from '../common/context';
import { AddCommentSimple } from '../components/comment';
import { StatusChecksSection } from '../components/merge';
import { ExitSection } from './exit';

const OpenInBrowserSection = () => {
	const { openOnGitHub } = useContext(PullRequestContext);
	const [isBusy, setIsBusy] = useState(false);

	const onClick = async () => {
		try {
			setIsBusy(true);
			await openOnGitHub();
		} finally {
			setIsBusy(false);
		}
	};

	return (
		<div className="button-container">
			<button title="Open this pull request on GitHub in your browser" disabled={isBusy} onClick={onClick}>
				Open in Browser
			</button>
		</div>
	);
};

export const Overview = (pr: PullRequest) => {
	return <>
		<div id="main">
			<AddCommentSimple {...pr} />
			<StatusChecksSection pr={pr} isSimple={true} />
			<OpenInBrowserSection />
			<ExitSection pr={pr} />
		</div>
	</>;
};


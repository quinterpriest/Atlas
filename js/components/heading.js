define([
	'knockout',
	'text!./heading.html',
	'components/Component',
	'utils/CommonUtils',
	'less!./heading.less'
], function (
	ko,
	view,
	Component,
	commonUtils
) {
	class Heading extends Component {
		constructor(params) {
			super(params);
			this.title = params.name;
			this.icon = params.icon || null;
			this.theme = params.theme || null;
			this.hasIcon = ko.computed(() => {
				return this.icon != null;
			});
			this.description = params.description;
			this.tags = params.tags;
		}

		getTags() {
			const tags = ko.unwrap(this.tags);
			return tags && tags
				.filter(t => t.groups && t.groups.length > 0)
				.map(t => {
					return {
						...t,
						fullName: t.name,
						ellipsisName: t.name.length > 22 ? t.name.substring(0, 20) + '...' : t.name
					}
				});
		}
	}

	return commonUtils.build('heading-title', Heading, view);
});
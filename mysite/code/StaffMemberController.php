<?php


class StaffMemberController extends PageController {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	private static $allowed_actions = array (
	);

	public function NextPage() {
		$page = Page::get()->filter(array(
			'ParentID' => $this->owner->ParentID,
			'Sort:GreaterThan' => $this->owner->Sort,
		))->First();
		return $page;
	}
	public function PreviousPage() {
		$page = Page::get()->filter(array(
			'ParentID' => $this->owner->ParentID,
			'Sort:LessThan' => $this->owner->Sort,
		))->Last();
		return $page;
	}

	public function init() {
		parent::init();

	}

}
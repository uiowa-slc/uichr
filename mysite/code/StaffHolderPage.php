<?php


class StaffHolderPage extends Page {

	private static $db = array(
	);

	private static $has_one = array(
	);
	private static $allowed_children = array(
		'StaffMember'
	);

	public function getCMSFields(){
		$fields = parent::getCMSFields();
		return $fields;

	}

}

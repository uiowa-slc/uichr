<?php


class Students extends Page {
	private static $db = array(

	);
	private static $has_one = array(

	);
	private static $has_many = array(

	);
	public function getCMSFields() {

		$fields = parent::getCMSFields();
		$fields->removeByName("PageSummary");



		return $fields;
	}
}

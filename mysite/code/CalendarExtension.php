<?php
class CalendarExtension extends DataExtension {

	private static $db = array(
	);

	private static $has_one = array(

	);

	public function updateCMSFields(FieldList $fields) {
		//$fields = parent::getCMSFields();
		$fields->removeByName("Testimonial");

		return $fields;
	}

}

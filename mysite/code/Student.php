<?php

class Student extends DataObject {

	private static $db = array(
		'Name' => 'Text',
		'Title' => 'Text',
		'Internship' => 'Text',
		'InternshipLink' => 'Text',
		'Content' => 'HTMLText',
		
	);

	private static $has_one = array(
		'Image' => 'Image',
		
	);


}

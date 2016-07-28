<?php

class Student extends DataObject {

	private static $db = array(
		'Name' => 'Varchar(255)',
		'Title' => 'Varchar(255)',
		'Internship' => 'Varchar(255)',
		'Content' => 'HTMLText',

	);

	private static $has_one = array(
		'Image' => 'Image',

	);


}

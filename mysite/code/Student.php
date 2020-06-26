<?php

use SilverStripe\Assets\Image;
use SilverStripe\ORM\DataObject;

class Student extends DataObject {

	private static $db = array(
		'Name' => 'Varchar(255)',
		'Title' => 'Varchar(255)',
		'Internship' => 'Varchar(255)',
		'Content' => 'HTMLText',

	);

	private static $has_one = array(
		'Image' => Image::class,

    );
    private static $owns = array(
		'Image'
	);


}

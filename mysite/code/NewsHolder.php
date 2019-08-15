<?php

use SilverStripe\Widgets\Model\WidgetArea;
use SilverStripe\Widgets\Forms\WidgetAreaEditor;
use SilverStripe\Blog\Model\Blog;
use SilverStripe\Blog\Model\BlogController;
class NewsHolder extends Blog {

	private static $db = array(

	);

	private static $has_one = array(
		"MyWidgetArea" => WidgetArea::class,
	);
	private static $belongs_many_many = array (
	);
	private static $has_many = array(
	);

	private static $allowed_children = array(
		'NewsEntry'
	);



	private static $singular_name = 'News Holder';

	private static $plural_name = 'News Holders';

	public function getCMSFields(){
		$fields = parent::getCMSFields();
		$fields->removeByName("PageSummary");
		$fields->addFieldToTab("Root.Widgets", new WidgetAreaEditor("MyWidgetArea"));
		return $fields;
	}


}

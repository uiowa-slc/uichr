<?php

use SilverStripe\Assets\Image;
use SilverStripe\Blog\Model\BlogTag;
use SilverStripe\AssetAdmin\Forms\UploadField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\TagField\TagField;
use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\ORM\ArrayList;
use SilverStripe\CMS\Controllers\ContentController;
class Page extends SiteTree {

	private static $db = array(
		"PageSummary" => "Text",
	);

	private static $has_one = array(
		"MainPhoto" => Image::class,
		"PageSummaryImg" => Image::class,
	);
	private static $many_many = array(
		'PageTags' => BlogTag::class,
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();

		$fields->removeByName("ExtraMeta");
		$fields->addFieldToTab("Root.Main", new UploadField("MainPhoto", "Page Photo (optional)"), "Content");
		$fields->addFieldToTab('Root.PageSummary', new TextareaField('PageSummary', 'Page Description'));
		$fields->addFieldToTab("Root.PageSummary", new UploadField("PageSummaryImg", "Page Summary Photo"));

		$tags = BlogTag::get();
		$tagField = TagField::create(
			'PageTags',
			'Show news tagged with:',
			$tags,
			$this->PageTags()
		)
			->setCanCreate(true)
			->setShouldLazyLoad(true);
		$fields->addFieldToTab('Root.Main', $tagField, 'Content');
		return $fields;

	}
	public function RandomChildren($count = 2) {
		return SiteTree::get()->filter('ParentID', $this->ID)->sort('RAND()')->limit($count);
	}

}

<?php

use SilverStripe\CMS\Model\SiteTree;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\Forms\TextField;
use SilverStripe\Forms\TreeDropdownField;
use SilverStripe\Forms\GridField\GridFieldConfig_RelationEditor;
use SilverStripe\Forms\GridField\GridField;
use UndefinedOffset\SortableGridField\Forms\GridFieldSortableRows;
class HomePage extends Page {
	private static $db = array(
		"HeroContent" => "Text",
		"HeroContentLinkText" => "Text",
		"ProgramHeading" => "Text",
		"ProgramContent" => "Text",
	);
	private static $has_one = array(
		'CarouselAssociatedPage' => SiteTree::class,
	);
	private static $has_many = array(
		'Programs' => 'Program',
		'Heros' => 'Hero'
	);
	public function getCMSFields() {

		$fields = parent::getCMSFields();
		$fields->removeByName("Widgets");
		$fields->removeByName("Metadata");
		$fields->removeByName("PageSummary");
		$fields->removeByName("PageTags");
		$fields->removeByName("Content");
		$fields->removeByName("MainPhoto");


		$fields->addFieldToTab("Root.Main", new HeaderField( 'Carousel', 'Carousel') );
		$fields->addFieldToTab("Root.Main", TextareaField::create("HeroContent", "Carousel Content")->addExtraClass('stacked'));
		$fields->addFieldToTab("Root.Main", new TextField("HeroContentLinkText", "Link Text"));
		$fields->addFieldToTab("Root.Main", new TreeDropdownField('CarouselAssociatedPageID', 'Link to this page', SiteTree::class));

		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Heros", "Carousel Items:", $this->Heros(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);


		$fields->addFieldToTab("Root.Main", new HeaderField( 'Programs', 'Programs' ) );
		$fields->addFieldToTab("Root.Main", new TextField("ProgramHeading", "Programs Heading"));
		$fields->addFieldToTab("Root.Main", new TextareaField("ProgramContent", "Programs Heading"));
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Programs", "Programs:", $this->Programs(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);



		return $fields;
	}
}

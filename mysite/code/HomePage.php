<?php
class HomePage extends Page {
	private static $db = array(

	);
	private static $has_one = array(

	);
	private static $has_many = array(
		'Programs' => 'Program',
		'Heros' => 'Hero'
	);
	function getCMSFields() {

		$fields = parent::getCMSFields();
		$fields->removeByName("Widgets");
		$fields->removeByName("Metadata");
		$fields->removeByName("PageSummary");
		$fields->removeByName("PageTags");

		$fields->addFieldToTab("Root.Main", new HeaderField( '<br><h3>Carousel</h3>', '3', true ) );
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Heros", "Carousel Items:", $this->Heros(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);

		$fields->addFieldToTab("Root.Main", new HeaderField( '<br><h3>Programs</h3>', '3', true ) );
		$gridFieldConfig = GridFieldConfig_RelationEditor::create()->addComponents();
		$gridFieldConfig->addComponent(new GridFieldSortableRows('SortOrder'));
		$gridField = new GridField("Programs", "Programs:", $this->Programs(), $gridFieldConfig);
		$fields->addFieldToTab("Root.Main", $gridField);



		return $fields;
	}
}
class HomePage_Controller extends Page_Controller {

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
	private static $allowed_actions = array(
	);

	//function Events(){
	//	$where = "ClassName = 'EventPage'";
	//	$result = DataObject::get("EventPage",$where,"","");
	//	return $result;
	//}

	public function init() {
		parent::init();

	}
}
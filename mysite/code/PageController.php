<?php

namespace {

    use SilverStripe\CMS\Controllers\ContentController;
    use SilverStripe\ORM\ArrayList;
    class PageController extends ContentController {

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
        public function RelatedNewsEntries(){
            $holder = NewsHolder::get()->First();
            $tags = $this->PageTags()->limit(6);
            $entries = new ArrayList();

            foreach($tags as $tag){
                $taggedEntries = $tag->BlogPosts()->exclude(array("ID"=>$this->ID))->sort('PublishDate', 'ASC')->Limit(3);
                if($taggedEntries){
                    foreach($taggedEntries as $taggedEntry){
                        if($taggedEntry->ID){
                            $entries->push($taggedEntry);
                        }
                    }
                }

            }

            if($entries->count() > 1){
                $entries->removeDuplicates();
            }
            return $entries;
        }



        protected function init()
        {
            parent::init();
            // You can include any CSS or JS required by your project here.
            // See: https://docs.silverstripe.org/en/developer_guides/templates/requirements/
        }

    }

}

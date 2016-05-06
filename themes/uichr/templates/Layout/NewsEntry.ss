<% include HeaderPhoto %>
<main class="container main" role="main">
	<div class="row">

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<article id="main-content" class="clearfix newsentry" tabindex="-1">
				<h1 class="entry-title">$Title</h1>
				<p class="entry-date">
					Posted on <time datetime="$PublishDate.format(c)" itemprop="datePublished">$PublishDate.format(F d Y)</time>
				</p>
				<hr />
				<% if $FeaturedImage %>
					<img src="$FeaturedImage.SetWidth(400).URL" alt="" class="right entryphoto">
				<% end_if %>

				$Content
				$Form

				<!-- Show Tags -->
				<% if TagsCollection %>
					<div class="tags">
						<% _t('BlogSummary_ss.TAGS','Tags') %>:
						<% loop TagsCollection %>
							<a href="$Link" title="View all posts tagged '$Tag'" rel="tag">$Tag</a><% if not Last %>,<% end_if %>
						<% end_loop %>
					</div>
				<% end_if %>

			</article>
		</div><!-- end .col -->

		<!-- Side Bar -->
		<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
			<div class="col-lg-3  col-lg-pull-9 sidebar">
				<% include SideNav %>
				<% include Testimonial %>
			</div>
		<% end_if %>
	</div><!-- end .row -->
</main><!-- end .container -->
<% include PhotoGallery %>
<% include InteriorEventList %>
<% include Enroll %>
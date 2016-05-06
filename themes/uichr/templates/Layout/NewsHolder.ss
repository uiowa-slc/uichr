<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
					$Content
					$Form
					<!-- Loop News -->
					<div class="newsholder-entries">
						<% loop PaginatedList %>
							<div class="newsblock clearfix <% if $Photo %>withphoto<% end_if %>">
								<div class="newsblock-info">
									<% if $FeaturedImagePhoto %>
										<a href="$Link">
											<img src="$FeaturedImage.CroppedImage(120,120).URL" alt="$Title" class="right">
										</a>
									<% end_if %>
									<h3 class="newsblock-title"><a href="$Link">$Title</a></h3>
									<p class="entry-date">
										Posted on <time datetime="$PublishDate.format(c)" itemprop="datePublished">$PublishDate.format(F d Y)</time>
									</p>
									<p class="entry-content">$Content.LimitCharacters(250)</p>
								</div>
							</div>
						<% end_loop %>
					</div>
					<% include NewsPagination %>
			</section>
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

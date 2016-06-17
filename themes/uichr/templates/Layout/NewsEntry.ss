<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">$Title</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
			<% include HeaderPhoto %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="col-md-12">

				<% if $FeaturedImage %>
					<img src="$FeaturedImage.SetWidth(350).URL" alt="" class="right entryphoto">
				<% end_if %>

				$Content
				$Form

				<hr>
				<p class="entry-meta">
					<% if $Credits %>
						<span class="author">by
						<% loop $Credits %><% if not $First && not $Last %>, <% end_if %><% if not $First && $Last %> and <% end_if %><% if $URLSegment %><a href="$URL">$Name.XML</a><% else %>$Name.XML<% end_if %><% end_loop %> <span class="bar">|</span> </span>
					<% end_if %>
					<span class="date">$PublishDate.format("F d, Y")</span>
					<% if $Categories.exists %>
						<span class="bar">|</span>
						<% loop $Categories %>
							<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
						<% end_loop %>
					<% end_if %>

					<% if $Tags.exists %>
						<span class="bar">|</span> Tagged:
						<% loop $Tags %>
							<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
						<% end_loop %>
					<% end_if %>
				</p>

			</div><!-- end .col -->
		</div><!-- end .row -->
	</section>

</main><!-- end .container -->
<% include RelatedNewsEntries %>
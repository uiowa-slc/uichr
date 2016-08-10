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
			<%-- Sub Navigation --%>
			<% if $Children || $Parent %>
				<% include SideNav %>
			<% end_if %>

			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="<% if $Children || $Parent %>col-lg-8 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
				$Content
				$Form
				<!-- Loop Staff Members -->
				<ul class="staffholder justify justify-3">
					<% loop $Children %>
						<li class="justify-item">
							<a href="$Link">
								<% if $StaffPhoto %>
									<img src="$StaffPhoto.CroppedFocusedImage(300,350).URL" alt="">
								<% end_if %>
								<h4 class="title">$Title</h4>
								<% if $StaffPosition %><em class="position">$StaffPosition</em><% end_if %>
							</a>
						</li>
					<% end_loop %>
					<li class="justify-item filler"></li>
					<li class="justify-item filler"></li>
				</ul>
				<!-- end Loop Staff Members -->
			</div><!-- end .col -->

			<!-- Side Bar -->
			<% if $Children || $Parent %><%--Determine if Side Nav should be rendered, you can change this logic --%>
				<% include SideBar %>
			<% end_if %>
		</div><!-- end .row -->
	</section>
</main><!-- end .container -->
<% include RelatedNewsEntries %>
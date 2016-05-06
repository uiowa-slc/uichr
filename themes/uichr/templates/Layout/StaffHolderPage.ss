<% include HeaderPhoto %>
<main class="container main" role="main">

	<div class="row">

		<!-- Main Content -->
		<div class="<% if $Children || $Parent %>col-lg-9 col-lg-push-3 children<% else %>col-md-10 col-md-offset-1<% end_if %>">
			<section id="main-content" tabindex="-1">
				<h1>$Title</h1>
				$Content
				$Form
				<!-- Loop Staff Members -->
				<ul class="staffholder justify justify-3">
					<% loop $Children %>
						<li class="justify-item">
							<% if $StaffPhoto %>
								<a href="$Link"><img src="$StaffPhoto.CroppedImage(300,400).URL" alt="$Title"></a>
							<% end_if %>
							<h4 class="title"><a href="$Link">$Title</a></h4>
							<% if $StaffPosition %><em class="position">$StaffPosition</em><% end_if %>
						</li>&nbsp;
					<% end_loop %>
					<li class="justify-item filler"></li>
					<li class="justify-item filler"></li>
				</ul>
				<!-- end Loop Staff Members -->
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
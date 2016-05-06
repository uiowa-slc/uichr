<div class="main-photo" style="background-image: url($BackgroundPhoto.CroppedFocusedImage(1600,700).URL);">
	<% include MainNav %>
	<div class="inner">
		<h3>$HomePhotoTitle</h3>
		<a href="$HomePhotoLink.Link" class="main-photo-link">$HomePhotoButtonText</a>
	</div>
</div>

<div class="home-programs">
	<div class="container">
		<h2>Dance Programs <span>for all ages</span></h2>
		<br>
		<p>$ProgramsPageContent</p>
	</div>
</div>

<div class="programs">
	<div class="container">
		<div class="row">
			<div class="program clearfix">
				<div class="border-img">
					<img src="$Program1Photo.CroppedImage(350,350).URL" alt="$Program1Title">
				</div>
				<div class="content">
					<h3>$Program1Title</h3>
					<p>$Program1Content</p>
					<a href="$Program1Link.Link">Explore</a>
				</div>
			</div>
			<div class="program clearfix">
				<div class="border-img">
					<img src="$Program2Photo.CroppedImage(350,350).URL" alt="$Program2Title">
				</div>
				<div class="content">
					<h3>$Program2Title</h3>
					<p>$Program2Content</p>
					<a href="$Program2Link.Link">Explore</a>
				</div>
			</div>
			<div class="program clearfix">
				<div class="border-img">
					<img src="$Program3Photo.CroppedImage(350,350).URL" alt="$Program3Title">
				</div>
				<div class="content">
					<h3>$Program3Title</h3>
					<p>$Program3Content</p>
					<a href="$Program3Link.Link">Explore</a>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="established">
	<div class="head">
		<div class="content">
			<h2>$PromoHeading</h2>
			<p>$PromoContent</p>
		</div>
	</div>
	<div class="established-photo">

	</div>
</div>

<div class="learn">
	<div class="top">
		<div class="container">
			<h2>Learn more about us</h2>
		</div>
	</div>
	<div class="bot">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="learn-spot clearfix">
						<div class="border-img">
							<img src="$AboutUsFeature1Photo.CroppedImage(350,350).URL" alt="$AboutUsFeature1Title">
						</div>
						<div class="content">
							<h5>$AboutUsFeature1SubTitle</h5>
							<h4><a href="$AssociatedPage.Link">$AboutUsFeature1Title</a></h4>
							<p>$AboutUsFeature1Content</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="learn-spot clearfix">
						<div class="border-img">
							<img src="$AboutUsFeature2Photo.CroppedImage(350,350).URL" alt="$AboutUsFeature2Title">
						</div>
						<div class="content">
							<h5>$AboutUsFeature2SubTitle</h5>
							<h4><a href="$AssociatedPageTwo.Link">$AboutUsFeature2Title</a></h4>
							<p>$AboutUsFeature2Content</p>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="announcements">
						<% with $Page(news) %>
							<% if $AllChildren %>
								<h3>Announcements</h3>
								<ul>
									<% loop $BlogPosts.Limit(3) %>
										<li>
											<span class="date">$PublishDate.format(F d)</span>
											<a href="$Link">$Title</a>

										</li>
									<% end_loop %>
								</ul>
								<p class="viewall"><a href="{$BaseHref}/news-and-events/news/">View all accouncements</a></p>
							<% end_if %>
						<% end_with %>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>








